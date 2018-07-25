package bs.entity;

import sun.misc.Cleaner;

import javax.persistence.*;
import java.util.*;

/**
 * @author yzy
 * <p>
 * TODO: index
 */
@Entity
@Table(
        name = "user",
        indexes = {
                @Index(name = "user_name_index", columnList = "user_name")
        }
)
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(name = "user_name", length = 31)
    private String name;

    @Column(name = "hashed_pwd", length = 44)
    private String hashedPassword;

    @Column(length = 24)
    private String salt;


    @Column(length = 15)
    private String gender;

    @Column(length = 50)
    private String email;

    @Column(length = 16)
    private String telephone;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHashedPassword() {
        return hashedPassword;
    }

    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserEntity that = (UserEntity) o;
        return Objects.equals(name, that.name) &&
                Objects.equals(hashedPassword, that.hashedPassword) &&
                Objects.equals(salt, that.salt) &&
                Objects.equals(gender, that.gender) &&
                Objects.equals(email, that.email) &&
                Objects.equals(telephone, that.telephone);
    }

    @Override
    public int hashCode() {

        return Objects.hash(name, hashedPassword, salt, gender, email, telephone);
    }
}
