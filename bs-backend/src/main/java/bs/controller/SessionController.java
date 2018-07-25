package bs.controller;

import bs.configs.Config;
import bs.entity.SessionEntity;
import bs.requests.session.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import bs.entity.UserEntity;
import bs.repositories.UserRepository;
import bs.repositories.SqlSessionRepository;
import bs.responses.session.LoginResponse;
import bs.responses.session.LogoutResponse;
import bs.utils.SecurityUtils;
import bs.utils.SessionUtils;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

/**
 * @author wty
 * <p>
 * RESTful APIs for login(creating), log out tokens, etc.
 */
@Controller
@RequestMapping(path = "/session")
public class SessionController {
    private final UserRepository userRepository;

    private final SqlSessionRepository sqlSessionRepository;

    @Autowired
    public SessionController(UserRepository userRepository, SqlSessionRepository sqlSessionRepository) {
        this.userRepository = userRepository;
        this.sqlSessionRepository = sqlSessionRepository;
    }

    @PostMapping(path = "/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest login) {
        String name = login.getName();
        String password = login.getPassword();
        System.out.println("name+password:"+name+'-'+password);
        //the account doesn't exit
        boolean userExist = userRepository.existsByName(name);
        System.out.println("!");
        if(!userExist){
            return new ResponseEntity<>(new LoginResponse(name,"", "The account doesn't exist"), HttpStatus.BAD_REQUEST);
        }
        //the password is wrong
        System.out.println("!!");
        UserEntity user = userRepository.findByName(name);
        System.out.println("!!!");
        String salt = user.getSalt();
        if(!user.getHashedPassword().equals(SecurityUtils.getHashedPasswordByPasswordAndSalt(password, salt))){
            return new ResponseEntity<>(new LoginResponse(name,"","The password is wrong"), HttpStatus.BAD_REQUEST);
        }
        //the user has log in
        Optional<SessionEntity> s = sqlSessionRepository.findByName(name);
        SessionEntity session;
        if(s.isPresent()){
            session = s.get();
        }else{
            session = new SessionEntity();
            session.setName(name);
            session.setTimestamp(Timestamp.valueOf(LocalDateTime.now()));
            session.setToken(SessionUtils.getToken());
        }
        System.out.println("!!!!");
        sqlSessionRepository.save(session);
        System.out.println("!!!!!");
        return new ResponseEntity<>(new LoginResponse(name, session.getToken(), "Log in successfully"), HttpStatus.OK);
    }
    @PostMapping(path = "/logout")
    public ResponseEntity<LogoutResponse> logout(@Autowired HttpServletRequest request) {
        String token = request.getHeader(Config.AUTH_HEADER);
        SessionEntity session = sqlSessionRepository.findByToken(token);
        if (session==null) {
            return new ResponseEntity<>(new LogoutResponse("Not logged in", null), HttpStatus.UNAUTHORIZED);
        } else {
            String uname = session.getName();
            sqlSessionRepository.delete(session);
            return new ResponseEntity<>(new LogoutResponse("OK", uname), HttpStatus.OK);
        }
    }

}
