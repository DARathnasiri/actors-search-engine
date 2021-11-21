birthplace_tokens = ["ඉපදුන", "ඉපදුනු", "උපන්", "උපත", "ඉපදුණු"]
month_tokens = ["ජනවාරි", "පෙබරවාරි", "මාර්තු", "අප්‍රේල්", "මැයි", "ජුනි",
                "ජුලි",  "අගෝස්තු", "සැප්තැම්බර්", "ඔක්තෝබර්", "නොවැම්බර්", "දෙසැම්බර්"]
other_tokens = ["නලුවන්", "මිනිසුන්", "අය", "මිනිස්සු",
                "නළුවන්", "මිනිස්සු", "පුද්ගලයන්", "පිරිස", "නලුවෝ", "ඇති", "තිබෙන", "කුමක්ද?", "මොකක්ද?", "මොකක්", "කුමක්",  "ද", "ද?"  "කුමක්ද", "මොකක්ද", "තැන",  "ලද",  "ලද", "ගත්", "ලැබූ"]
religion_tokens = ["ආගම", "අගම"]
education_tokens = ["පාසල", "විද්‍යාලය"]
education_actors_tokens = ["පාසලේ", "විද්‍යාලයයේ", "උගත්", "ඉගෙනගත්", "ඉගෙන", "ඉගෙනුම", "අධ්‍යාපනය", "අද්‍යාපනය"]
nationality_tokens = ["ජාතිය"]

advanced_token = ["ගනන", "ගණන"]

nationality_advanced_tokens  = ["ශ්‍රී ලාංකික", "ඇමෙරිකානු", "ඉංග්‍රීසි", "අයිරිෂ්", "ඕස්ට්‍රේලියානු", "කැනේඩියානු", "ස්වීඩන්", "ප්‍රංශ", "නෝර්වීජියානු", "ස්පාඤ්ඤ", "බංග්ලාදේශ", "නිව්සීලන්තය", "ස්කොට්ලන්ත", "චීන", "තායිවානයේ", "ඉන්දීය", "ජපන්", "ඉන්දුනීසියානු"]

religion_advanced_tokens = ["බුද්ධාගම", "ක්‍රිස්තියානි", "කතෝලික ධර්මය", "යුදෙව් ආගම", "අදේවවාදය", "හින්දු ආගම", "ක්රමවේදය", "එපිස්කෝපල්", "ඉස්ලාමය"]

def classify(token_list):
    birthplace_i = False
    birthYear = False
    month_i = False
    other_tokens_str = ''
    other_i = False
    religion_i = False
    education_i = False
    nationality_i = False
    education_actors_i = False
    advanced_i = False
    nationality_advanced_i = False
    religion_advanced_i = False

    for token in token_list:
        if token.isdigit():
            birthYear = True
        elif token in month_tokens:
            month_i = True
        elif token in birthplace_tokens:
            birthplace_i = True
            birthYear = True
        elif token in religion_tokens:
            religion_i = True
        elif token in education_tokens:
            education_i = True
        elif token in education_actors_tokens:
            education_actors_i = True
        elif token in nationality_tokens:
            nationality_i = True
        elif token in other_tokens:
            other_i = True
        elif token in advanced_token:
            advanced_i = True
        elif token in nationality_advanced_tokens:
            nationality_advanced_i = True
            other_tokens_str += token + ' '
        elif token in religion_advanced_tokens:
            religion_advanced_i = True
            other_tokens_str += token + ' '
        else:
            other_tokens_str += token + ' '

    if month_i == False and birthplace_i == False and birthYear == False and religion_i == False and education_i == False and nationality_i == False and education_actors_i == False and advanced_i == False:
        return False
    else:
        return [birthplace_i, month_i, birthYear, religion_i, education_i, nationality_i, education_actors_i, other_tokens_str, advanced_i, nationality_advanced_i, religion_advanced_i]