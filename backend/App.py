import flask
from flask_cors import CORS
from elasticsearch import Elasticsearch
import process_sinhala
from Rules import classify
from flask import request


index_name = 'actors_si'
es = Elasticsearch('localhost', port=9200)
tokenizer = None
stemmer = None


def query_es_basic(search_term, limit):
    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'multi_match': {
                    'query': search_term,
                    'fields': [
                        "නම^4",
                        "ආගම^2",
                        "උපන් ස්ථානය^2",
                        "ජාතිය^2",
                        "වෘත්තිය ජීවිතය",
                        "උපන් දිනය",
                        "පෞද්ගලික ජීවිතය"
                    ]
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 7
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 7
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 7
                    }
                }
            }
        }
    )
    res["single"] = False
    return res


def query_es_basic_boosted(limit, classify_out, query, new_search_querty):
    search_term = query
    should_list = []

    if classify_out[0]:
        should_list.append({'match': {'උපන් ස්ථානය': new_search_querty[:5]}})
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif classify_out[1]:
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif classify_out[2]:
        should_list.append({'match': {'උපන් දිනය': search_term}})
    elif classify_out[3]:
        return single_result_search(new_search_querty, category="relegion")
    elif classify_out[4]:
        return single_result_search(new_search_querty, category="school")
    elif classify_out[5]:
        return single_result_search(new_search_querty, category="nationality")
    elif classify_out[6]:
        print("DEBUG ==> Fetch actors of this school", new_search_querty)
        return education_search(new_search_querty)
    elif search_term != '':
        should_list.append({'match': {'නම': search_term}})
        should_list.append({'match': {'පෞද්ගලික ජීවිතය': search_term}})
        should_list.append({'match': {'වෘත්තිිය ජීවිතය': search_term}})
        should_list.append({'match': {'ජාතිය': search_term}})

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'bool': {
                    'should': should_list
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 7
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 7
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 7
                    }
                }
            }
        }
    )
    res["single"] = False
    return res


def single_result_search(search_term, category):
    search_term = search_term.replace("ගේ", "")
    field = ""

    if category == "relegion":
        field = "ආගම"
    elif category == "school":
        field = "අධ්‍යාපනය"
    elif category == "nationality":
        field = "ජාතිය"
    res = es.search(
        index=index_name,
        size=1,
        body={
            "query": {
                "match_phrase_prefix": {
                    "නම": search_term
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 7
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 7
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 7
                    }
                }
            }
        }
    )
    if res["hits"]["total"]["value"] > 0:
        res["single"] = True
        res["single_result"] = (res["hits"]["hits"][0]["_source"][field])
    else:
        res["single"] = False
    print(res)
    return res


def basicSearch(query):
    query = query.replace('.', ' ')
    limit = 50

    # phrase query check
    if query[0] == '"' and query[-1] == '"':
        return phrase_queries_basic(query)

    token_list = query.split(" ")
    rules = classify(token_list)
    print(rules)

    if rules == False:
        print('[DEBUG] Not rating query => query_es_basic')
        return query_es_basic(query, limit)
    elif (rules[8] == True) and (rules[9] == True):
        content = {'name': '', 'bday': '', 'country': '', 'relegion': '', 'nationality': rules[7], 'school': ''}
        res = advanced_search(content)
        return res
    elif (rules[8] == True) and (rules[10] == True):
        content = {'name': '', 'bday': '', 'country': '', 'relegion': rules[7], 'nationality': '', 'school': ''}
        res = advanced_search(content)
        return res
    else:
        new_search_querty = rules[7]
        print('[DEBUG] Rating query => query_es_basic_boosted')
        return query_es_basic_boosted(limit, rules, query, new_search_querty)


def advanced_search(data):
    limit = 50

    must_list = []

    name = data["name"]
    country = data["country"]
    bday = data["bday"]
    relegion = data["relegion"]
    school = data["school"]
    nationality = data["nationality"]

    print(name, bday, country, relegion)

    if name != "":
        must_list.append({'match_phrase': {'නම': name}})
    if country != "":
        must_list.append({'match_phrase': {'උපන් ස්ථානය': country[:5]}})
    if bday != "":
        must_list.append({'match_phrase': {'උපන් දිනය': bday}})
    if relegion != "":
        must_list.append({'match_phrase': {'ආගම': relegion}})
    if school != "":
        must_list.append({'match_phrase': {'අධ්‍යාපනය': school}})
    if nationality != "":
        must_list.append({'match_phrase': {'ජාතිය': nationality}})

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'bool': {
                    'must': must_list,
                }
            },
                "aggs": {
                    "relegion_filter": {
                        "terms": {
                            "field": "ආගම.keyword",
                            "size": 7
                        }
                    },
                    "nation_filter": {
                        "terms": {
                            "field": "ජාතිය.keyword",
                            "size": 7
                        }
                    },
                    "birth_filter": {
                        "terms": {
                            "field": "උපන් ස්ථානය.keyword",
                            "size": 7
                        }
                    }
                }
        }
    )
    res["single"] = False
    return res

def phrase_queries_basic(query):  #phrase query that matches exact query given
    res = es.search(
        index=index_name,
        body={
                "query": {
                    "query_string": {
                    "query": query,
                    "default_operator": "AND"
                    }
                },
                "aggs": {
                    "relegion_filter": {
                        "terms": {
                            "field": "ආගම.keyword",
                            "size": 7
                        }
                    },
                    "nation_filter": {
                        "terms": {
                            "field": "ජාතිය.keyword",
                            "size": 7
                        }
                    },
                    "birth_filter": {
                        "terms": {
                            "field": "උපන් ස්ථානය.keyword",
                            "size": 7
                        }
                    }
                }
            }
    )

    return res


def education_search(search_term):

    limit = 50

    res = es.search(
        index=index_name,
        size=limit,
        body={
            'query': {
                'multi_match': {
                    'query': search_term,
                    'fields': [
                        "අධ්‍යාපනය"
                    ]
                }
            },
            "aggs": {
                "relegion_filter": {
                    "terms": {
                        "field": "ආගම.keyword",
                        "size": 7
                    }
                },
                "nation_filter": {
                    "terms": {
                        "field": "ජාතිය.keyword",
                        "size": 7
                    }
                },
                "birth_filter": {
                    "terms": {
                        "field": "උපන් ස්ථානය.keyword",
                        "size": 7
                    }
                }
            }
        }
    )
    res["single"] = False
    return res


app = flask.Flask(__name__)
app.config['SECRET_KEY'] = 'tdj lyric app'
app.config['CORS_HEADERS'] = 'Content-Type'


cors = CORS(app)


@app.route('/basicsearch', methods=['POST'])
def basic():
    print("in basic search")
    content = request.json
    q = content["q"]
    return basicSearch(q)


@app.route('/advancedsearch', methods=['POST'])
def advanced():
    print("In advanced Search ")
    content = request.json
    return advanced_search(content)


if __name__ == '__main__':
    tokenizer, stemmer = process_sinhala.get_sn_process_setup()

    app.run(host='127.0.0.1', port='5002')