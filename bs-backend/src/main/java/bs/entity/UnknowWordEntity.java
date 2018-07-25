package bs.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(
        name = "unknow",
        indexes = {
                @Index(name = "unknow_word_index", columnList = "ukwid")
        }
)
public class UnknowWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ukwid;

    @Column(name = "ukwName")
    private String ukwName;

    @Column(name = "latestReciteTime")
    private Timestamp latestReciteTime;

    @Column(name = "knowledge_level")
    private int knowledge_level;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "word_id")
    private WordEntity word;

    public UnknowWordEntity(String ukwName, Timestamp latestReciteTime, int knowledge_level, UserEntity user, WordEntity word) {
        this.ukwName = ukwName;
        this.latestReciteTime = latestReciteTime;
        this.knowledge_level = knowledge_level;
        this.user = user;
        this.word = word;
    }

    public UnknowWordEntity(){}

    public Long getUkwid() {
        return ukwid;
    }

    public void setUkwid(Long ukwid) {
        this.ukwid = ukwid;
    }

    public String getUkwName() {
        return ukwName;
    }

    public void setUkwName(String ukwName) {
        this.ukwName = ukwName;
    }

    public Timestamp getLatestReciteTime() {
        return latestReciteTime;
    }

    public void setLatestReciteTime(Timestamp latestReciteTime) {
        this.latestReciteTime = latestReciteTime;
    }

    public int getKnowledge_level() {
        return knowledge_level;
    }

    public void setKnowledge_level(int knowledge_level) {
        this.knowledge_level = knowledge_level;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public WordEntity getWord() {
        return word;
    }

    public void setWord(WordEntity word) {
        this.word = word;
    }
}
