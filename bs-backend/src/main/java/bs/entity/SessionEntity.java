package bs.entity;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * @author wty
 */
@Entity
@Table(
        name = "session",
        indexes = {
        @Index(name = "uname_Index", columnList = "name", unique = true)
})
public class SessionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(length = 25)
    private String name;

    @GeneratedValue()
    private Timestamp timestamp;

    @Column(length = 100)
    private String token;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
