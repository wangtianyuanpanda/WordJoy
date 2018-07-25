package bs.controller;

import bs.requests.information.AddUserRequest;
import bs.responses.information.AddUserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import static bs.utils.SecurityUtils.getHashedPasswordByPasswordAndSalt;
import static bs.utils.SecurityUtils.getSalt;
import bs.repositories.UserRepository;
import bs.entity.UserEntity;
/**
 * @author wty
 * <p>
 * For management of User register, delete and query, etc.
 * NOT for sessions.
 */
@Controller
@RequestMapping(path = "/user")
public class UserController {
    private final UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<AddUserResponse> add(@RequestBody AddUserRequest user) {
        String name = user.getName();
        String gender = user.getGender();
        String email = user.getEmail();
        String password = user.getPassword();
        String telephone = user.getTelephone();
        if (userRepository.existsByName(name)) {
            return new ResponseEntity<>(new AddUserResponse("The account exists", ""), HttpStatus.BAD_REQUEST);
        }

        UserEntity userEntity = new UserEntity();
        userEntity.setName(name);
        userEntity.setEmail(email);
        userEntity.setGender(gender);
        userEntity.setTelephone(telephone);
        //get salt
        String salt = getSalt();
        userEntity.setSalt(salt);
        if (name.isEmpty()){
            return new ResponseEntity<>(new AddUserResponse("Name can't be empty", ""), HttpStatus.BAD_REQUEST);
        }
        if(password.length() < 6){
            return new ResponseEntity<>(new AddUserResponse("Password should be at least 6 characters",  ""), HttpStatus.BAD_REQUEST);
        }
        userEntity.setHashedPassword(getHashedPasswordByPasswordAndSalt(password, salt));
        userRepository.save(userEntity);
        return new ResponseEntity<>(new AddUserResponse("OK", name), HttpStatus.CREATED);
    }
}
