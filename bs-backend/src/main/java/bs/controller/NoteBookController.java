package bs.controller;

import bs.annotations.session.CurrentUser;
import bs.entity.UnknowWordEntity;
import bs.entity.UserEntity;
import bs.entity.WordEntity;
import bs.repositories.SqlSessionRepository;
import bs.repositories.UnKnowWordRepository;
import bs.repositories.UserRepository;
import bs.repositories.WordRepository;
import bs.responses.information.NoteBookResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/notebook")
public class NoteBookController {
    private final UserRepository userRepository;
    private final UnKnowWordRepository unKnowWordRepository;
    private final SqlSessionRepository sqlSessionRepository;
    private final WordRepository wordRepository;

    public NoteBookController(UserRepository userRepository, UnKnowWordRepository unKnowWordRepository, SqlSessionRepository sqlSessionRepository, WordRepository wordRepository) {
        this.userRepository = userRepository;
        this.unKnowWordRepository = unKnowWordRepository;
        this.sqlSessionRepository = sqlSessionRepository;
        this.wordRepository = wordRepository;
    }

    @GetMapping(path = "list")
    public ResponseEntity<NoteBookResponse>list(
            @CurrentUser UserEntity user
            ){
//        long userId = user.getId();
        List<WordEntity> unKnownWords = new ArrayList<>();
        for(UnknowWordEntity u: unKnowWordRepository.findByUserAndLatestReciteTimeNotNull(user)){
            if(wordRepository.findById(u.getWord().getId()).isPresent()){
                unKnownWords.add(wordRepository.findById(u.getWord().getId()).get());
            }
        }
        if(unKnownWords.isEmpty())
        {
            return new ResponseEntity<>(new NoteBookResponse("Have no unknown words",null),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new NoteBookResponse("Get unknown words list",unKnownWords),HttpStatus.OK);
    }

    @GetMapping(path = "testlist")
    public ResponseEntity<NoteBookResponse>testlist(
            @CurrentUser UserEntity user
    ){
//        long userId = user.getId();
        int count = 0;
        List<WordEntity> unKnownWords = new ArrayList<>();
        for(UnknowWordEntity u: unKnowWordRepository.findByUser(user)){
            if(wordRepository.findById(u.getWord().getId()).isPresent()){
                unKnownWords.add(wordRepository.findById(u.getWord().getId()).get());
                if(++count==12){
                    break;
                }
            }
        }
        if(unKnownWords.isEmpty())
        {
            return new ResponseEntity<>(new NoteBookResponse("Have no unknown words",null),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new NoteBookResponse("Get unknown words list",unKnownWords),HttpStatus.OK);
    }

}
