package bs.controller;

import bs.annotations.session.Authorization;
import bs.annotations.session.CurrentUser;
import bs.entity.KnowWordEntity;
import bs.entity.UnknowWordEntity;
import bs.entity.UserEntity;
import bs.entity.WordEntity;
import bs.repositories.KnowWordRepository;
import bs.repositories.UnKnowWordRepository;
import bs.repositories.UserRepository;
import bs.repositories.WordRepository;
import bs.responses.information.BasicResponse;
import bs.responses.information.GetWordResponse;
import bs.utils.TimeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import bs.requests.information.AddWordRequest;
import bs.utils.TimeUtils;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import static bs.utils.TimeUtils.getBeginOfDay;
import static bs.utils.TimeUtils.getEndOfDay;

@Controller
@RequestMapping(path = "/words")
public class WordController {
    private final WordRepository wordRepository;
    private final UserRepository userRepository;
    private final KnowWordRepository knowWordRepository;
    private final UnKnowWordRepository unKnowWordRepository;

    @Autowired
    WordController(WordRepository wordRepository, UserRepository userRepository, KnowWordRepository knowWordRepository, UnKnowWordRepository unKnowWordRepository) {
        this.wordRepository = wordRepository;
        this.userRepository = userRepository;
        this.knowWordRepository = knowWordRepository;
        this.unKnowWordRepository = unKnowWordRepository;
    }

    @GetMapping(path = "/initialize/{uname}")
    public ResponseEntity<BasicResponse> initializeWords(
            @PathVariable String uname
    ) {
        UserEntity user = userRepository.findByName(uname);
        UnknowWordEntity ukw;
        String ukwName;
        System.out.println(uname);
        System.out.println(user.getName());
        for (WordEntity e : wordRepository.findAll()) {
            ukwName = e.getEnglish() + "UKW" + uname;
            System.out.println(ukwName);
            if(!unKnowWordRepository.existsByUkwName(ukwName)) {
                ukw = new UnknowWordEntity(ukwName, null, 0, user, e);
                unKnowWordRepository.save(ukw);
            }
        }
        return new ResponseEntity<>(new BasicResponse("Initialize successfully"), HttpStatus.OK);
    }

    @GetMapping(path = "/cet4All")
    public ResponseEntity<GetWordResponse> getCet4WordAllTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
//        String uname = user.getName();
        List<WordEntity> words = new ArrayList<>();
        if(unKnowWordRepository.findByWord_TypeAndUser( "cet4", user).isEmpty()){
        for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("cet4", user)) {
            words.add(w.getWord());
        } }
        else {
            for(UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser( "cet4", user)){
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @GetMapping(path = "/cet4")
    public ResponseEntity<GetWordResponse> getCet4WordTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
//        String uname = user.getName();
        List<WordEntity> words = new ArrayList<>();
        Timestamp start = getBeginOfDay();
        Timestamp end = getEndOfDay();
        int count = 0;
        if(unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "cet4").isEmpty()){
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("cet4", user)) {
                words.add(w.getWord());
                if(++count==10){
                    break;
                }
            } }
        else {
            for(UnknowWordEntity w : unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "cet4")){
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @GetMapping(path = "/cet6")
    public ResponseEntity<GetWordResponse> getCet6WordTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
        List<WordEntity> words = new ArrayList<>();
        Timestamp start = getBeginOfDay();
        Timestamp end = getEndOfDay();
        int count = 0;
        if (unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "cet6").isEmpty()) {
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("cet6", user)) {
                words.add(w.getWord());
                if (++count == 10) {
                    break;
                }
            }
        } else {
            for (UnknowWordEntity w : unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "cet6")) {
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
        }
    @GetMapping(path = "/cet6All")
    public ResponseEntity<GetWordResponse> getCet6WordAllTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
//        String uname = user.getName();
        List<WordEntity> words = new ArrayList<>();
        if(unKnowWordRepository.findByWord_TypeAndUser( "cet6", user).isEmpty()){
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("cet6", user)) {
                words.add(w.getWord());
            } }
        else {
            for(UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser( "cet6", user)){
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }
    @GetMapping(path = "/toefl")
    public ResponseEntity<GetWordResponse> getToeflWordTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
        List<WordEntity> words = new ArrayList<>();
        Timestamp start = getBeginOfDay();
        Timestamp end = getEndOfDay();
        int count = 0;
        if (unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "toefl").isEmpty()) {
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("toefl", user)) {
                words.add(w.getWord());
                if (++count == 10) {
                    break;
                }
            }
        } else {
            for (UnknowWordEntity w : unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "toefl")) {
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @GetMapping(path = "/toeflAll")
    public ResponseEntity<GetWordResponse> getToeflWordAllTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
//        String uname = user.getName();
        List<WordEntity> words = new ArrayList<>();
        if(unKnowWordRepository.findByWord_TypeAndUser( "toefl", user).isEmpty()){
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("toefl", user)) {
                words.add(w.getWord());
            } }
        else {
            for(UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser( "toefl", user)){
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @GetMapping(path = "/ielts")
    public ResponseEntity<GetWordResponse> getIeltsWordTable(
            @CurrentUser UserEntity user
    ) {
        List<WordEntity> words = new ArrayList<>();
        Timestamp start = getBeginOfDay();
        Timestamp end = getEndOfDay();
        int count = 0;
        if (unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "ielts").isEmpty()) {
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("ielts", user)) {
                words.add(w.getWord());
                if (++count == 10) {
                    break;
                }
            }
        } else {
            for (UnknowWordEntity w : unKnowWordRepository.findByLatestReciteTimeBetweenAndUserAndWord_Type(start, end, user, "ielts")) {
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @GetMapping(path = "/ieltsAll")
    public ResponseEntity<GetWordResponse> getIeltsWordAllTable(
            @CurrentUser UserEntity user
    ) {
        // List<Cet4WordEntity> cet4words = new ArrayList<>();
//        String uname = user.getName();
        List<WordEntity> words = new ArrayList<>();
        if(unKnowWordRepository.findByWord_TypeAndUser( "ielts", user).isEmpty()){
            for (UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser("ielts", user)) {
                words.add(w.getWord());
            } }
        else {
            for(UnknowWordEntity w : unKnowWordRepository.findByWord_TypeAndUser( "ielts", user)){
                words.add(w.getWord());
            }
        }
        GetWordResponse response = new GetWordResponse(words);
        return new ResponseEntity<>(response,
                HttpStatus.OK);
    }

    @Authorization
    @Transactional(rollbackFor = {})
    @GetMapping(path = "/recite/know/{english}")
    public ResponseEntity<BasicResponse> knowAWord(
            @CurrentUser UserEntity user,
            @PathVariable String english
    ) {
        WordEntity word = wordRepository.findByEnglish(english);
        String kwname = word.getEnglish() + "KW" + user.getName();
        String ukwname = word.getEnglish() + "UKW" + user.getName();
        System.out.println("name:" + user.getName());
        //get the recite time
        Timestamp reciteTime = new Timestamp((System.currentTimeMillis()));
        UnknowWordEntity ukw = unKnowWordRepository.findByUkwName(ukwname);
        if (ukw.getKnowledge_level() == 2) {
            unKnowWordRepository.deleteByWordAndUser(word, user);
            KnowWordEntity kw = new KnowWordEntity(reciteTime, 3, kwname, user, word);
            knowWordRepository.save(kw);
        } else {
            ukw.setKnowledge_level(ukw.getKnowledge_level() + 1);
            ukw.setLatestReciteTime(reciteTime);
            unKnowWordRepository.save(ukw);
        }
        return new ResponseEntity<>(new BasicResponse("Known it!"), HttpStatus.OK);
    }

    @Authorization
    @GetMapping(path = "/recite/unknow/{english}")
    public ResponseEntity<BasicResponse> unknownAWord
            (
                    @CurrentUser UserEntity user,
                    @PathVariable String english
            ) {
        WordEntity word = wordRepository.findByEnglish(english);
        String ukwName = word.getEnglish() + "UKW" + user.getName();
        //get the recite time
        Timestamp reciteTime = new Timestamp((System.currentTimeMillis()));
        UnknowWordEntity ukw = unKnowWordRepository.findByUkwName(ukwName);
        if (ukw.getKnowledge_level() != 0)
            ukw.setKnowledge_level(ukw.getKnowledge_level() - 1);
        ukw.setLatestReciteTime(reciteTime);
        unKnowWordRepository.save(ukw);
        return new ResponseEntity<>(new BasicResponse("Unknow it!"), HttpStatus.OK);
    }

    @Authorization
    @Transactional(rollbackFor = {})
    @PostMapping(path = "/add")
    public ResponseEntity<BasicResponse> addWord(
            @CurrentUser UserEntity user,
            @RequestBody AddWordRequest word
    ) {
        if(!wordRepository.existsByEnglish(word.getEnglish())) {
            WordEntity newWord = new WordEntity(word.getEnglish(), word.getChinese(), word.getExample(), word.getType());
            wordRepository.save(newWord);
            if (unKnowWordRepository.existsByWordAndUser(newWord, user)) {
                wordRepository.deleteByEnglish(word.getEnglish());
                return new ResponseEntity<>(new BasicResponse("The word exists in the word book"), HttpStatus.BAD_REQUEST);
            } else {
                String ukwname = word.getEnglish() + "UKW" + user.getName();
                Timestamp reciteTime = new Timestamp((System.currentTimeMillis()));
                UnknowWordEntity ukw = new UnknowWordEntity(ukwname, reciteTime, 0, user, newWord);
                unKnowWordRepository.save(ukw);
                return new ResponseEntity<>(new BasicResponse("Insert successfully"), HttpStatus.OK);
            }
        }else{
            return new ResponseEntity<>(new BasicResponse("The word exists in the word book"), HttpStatus.BAD_REQUEST);
        }
    }

    @Authorization
    @Transactional(rollbackFor = {})
    @GetMapping(path = "/delete/{english}")
    public ResponseEntity<BasicResponse> deleteWord(
            @CurrentUser UserEntity user,
            @PathVariable String english
    ){
        unKnowWordRepository.deleteByWord_English(english);
        return new ResponseEntity<>(new BasicResponse("Delete successfully"), HttpStatus.OK);
    }

    @GetMapping(path = "/knowNumber/{type}")
    public ResponseEntity<BasicResponse> getKnowNum(
            @CurrentUser UserEntity user,
            @PathVariable String type
    ){
        Timestamp start = getBeginOfDay();
        Timestamp end = getEndOfDay();
        int num = knowWordRepository.findByLatestReciteTimeBetweenAndWord_TypeAndUser(start, end, type, user).size();
        String total = Integer.toString(num);
        return new ResponseEntity<>(new BasicResponse(total), HttpStatus.OK);
    }

}



