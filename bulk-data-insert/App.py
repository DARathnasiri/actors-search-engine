from elasticsearch import Elasticsearch, helpers
import json

client = Elasticsearch(HOST="http://localhost", PORT=9200)
index = 'actors_si'


def readActors():
    with open('actor_si.json', 'r', encoding='utf-8') as f:
        actorsData = json.loads(f.read().replace("}\n{", "},\n{"))
        responseList = [a for n, a in enumerate(actorsData) if a not in actorsData[n + 1:]]
        return responseList


def generateData(actorsData):
    for song in actorsData:
        name = song.get("නම", None)
        birthday = song.get("උපන් දිනය", None)
        birthPlace = song.get("උපන් ස්ථානය", None)
        nationality = song.get("ජාතිය", None)
        religion = song.get("ආගම", None)
        education = song.get("අධ්‍යාපනය", None)
        personalLife = song.get("පෞද්ගලික ජීවිතය", None)
        career = song.get("වෘත්තිය ජීවිතය", None)

        yield {
            "_index": index,
            "_source": {
                "නම": name,
                "උපන් දිනය": birthday,
                "උපන් ස්ථානය": birthPlace,
                "ජාතිය": nationality,
                "ආගම": religion,
                "අධ්‍යාපනය": education,
                "පෞද්ගලික ජීවිතය": personalLife,
                "වෘත්තිය ජීවිතය": career
            },
        }


actors = readActors()

helpers.bulk(client, generateData(actors))
