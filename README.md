# actors-search-engine

This is a actors search engine. Actors' details can be searched in sinhala language by this search engine.

This system has four main components.
1. React frontend
2. Flask backend
3. Elastic search index
4. Python Program for uploading bulk data

This system used,
> React version 17.0.2 <br />
> Flask version 2.0.2 <br />
> Python version 3.8.5 <br />
> Elasticsearch 7.15.1

## Getting Started
### Setting Up Elasticsearch

1. Download and run [Elasticsearch](https://www.elastic.co/downloads/elasticsearch).
2. Install [ICU Analysis](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis-icu.html) plugin.
3. Optionally install [Kibana](https://www.elastic.co/downloads/kibana) for executing below query operations.

### Setting Up the Index
1. Execute below queries for create an index named `actors_si` in the elasticsearch
```
PUT /actors_si
{
  "settings": {
    "index": {
      "analysis": {
        "analyzer": {
          "sinhalaAnalyzer": {
            "type": "custom",
            "tokenizer": "icu_tokenizer",
            "filter": ["edgeNgram"],
            "char_filter": ["dotFilter"]
          }
        },
        "filter": {
          "edgeNgram": {
            "type": "edge_ngram",
            "min_gram": 2,
            "max_gram": 50,
            "side": "front"
          }
        },
        "char_filter": {
          "dotFilter": {
            "type": "mapping",
            "mappings": ". => \\u0020"
          }
        }
      }
    }
  }
}
```

```
PUT actors_si/_mappings/
{
  "properties": {
    "නම": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "උපන් දිනය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "උපන් ස්ථානය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "ජාතිය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "ආගම": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "අධ්‍යාපනය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "පෞද්ගලික ජීවිතය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": "standard"
    },
    "වෘත්තිය ජීවිතය": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      },
      "analyzer": "sinhalaAnalyzer",
      "search_analyzer": Angular Front-end"standard"
    }
  }
}
```
2. Run `App.py` file in `bulk-data-insert` folder to insert the actor details data into the elasticsearch index.<br/>
Following command can be used for run the `App.py`
```
python App.py
```
*You may want to install required python packages. Packages can be install with pip install*

### Setting Up Backend
2. Run `App.py` file in `backend` folder.<br/>
Following command can be used for run the `App.py`
```
python App.py
```
*You may want to install required python packages. Packages can be install with pip install*

### Setting Up Frontend
1. Go inside into `frontend` folder and execute following commands in the terminal.
```
npm install
npm start
```

## Running the Project
1. Run the Elasticsearch instance.
2. Run the backend by executing `python App.py` command in the `backend` folder.
3. Run the frontend by executing `npm start` command in the `frontend` folder.

## Basic Usage Examples
* Search by keywords<br/>
*eg:*
> සිඩ්නි<br/>
> විශ්ව විද්යාලය

* Search by pharse queries<br/>
*eg:*
> "නිව් යෝර්ක්"

* Search by wildcard queries<br/>
*eg:*
> අබයර*

* Search by education<br/>
*eg:*<br/>
> රාහුල විද්‍යාලයයේ උගත් නලුවෝ <br/>
> රාහුල විද්‍යාලයයේ ඉගෙනගත් නලුවෝ <br/>

* Search by birth place<br/>
*eg:*<br/>
> කොළඹ ඉපදුන නලුවෝ <br/>
> කොළඹ උපන් නලුවෝ <br/>

* Search by birth year <br/>
*eg:*<br/>
> 1980 ඉපදුන නලුවෝ <br/>
> 1997 උපන් නලුවෝ <br/>

* Search by birth month <br/>
*eg:*<br/>
> ජනවාරි ඉපදුන නලුවෝ <br/>
> පෙබරවාරි උපන් නලුවෝ <br/>

* Search by nationality <br/>
*eg:*<br/>
> කැනේඩියානු නලුවන් ගණන <br/>
> ඇමෙරිකානු නලුවන් ගණන <br/>

* Search for nationality of a specific actor <br/>
*eg:*<br/>
> පුබුදු චතුරංගගේ ජාතිය <br/>

* Search for religion of a specific actor <br/>
*eg:*<br/>
> පුබුදු චතුරංගගේ ආගම <br/>

* Search for education of a specific actor <br/>
*eg:*<br/>
> පුබුදු චතුරංගගේ පාසල <br/>

* Search by actor name in advanced search<br/>
*eg:*
> පුබුදු චතුරංග<br/>
> ටෙනිසන් කුරේ

* Search by nationality in advanced search<br/>
*eg:*<br/>
> කැනේඩියානු <br/>
> ඇමෙරිකානු

* Search by religion in advanced search<br/>
*eg:*<br/>
> බුද්ධාගම<br/>
> කතෝලික ධර්මය

* Search by birth year in advanced search<br/>
*eg:*<br/>
> 1980<br/>
> 1997

* Search by birth month in advanced search<br/>
*eg:*<br/>
> ජනවාරි <br/>
> පෙබරවාරි

* Search by birth place in advanced search<br/>
*eg:*<br/>
> කොළඹ<br/>
> පෙබරවාරි

* Search with more filters in advanced search

## Additional Details
The project utilizes the below query types in Elasticsearch.
* [Multi-match query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html)
* [Boolean query with must](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
* [Boolean query with should](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-bool-query.html)
* [Phrase query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html)
* [match phrase prefix](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query-phrase-prefix.html)
* [Aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html)
