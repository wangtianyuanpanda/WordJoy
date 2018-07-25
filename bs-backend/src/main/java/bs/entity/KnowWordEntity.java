package bs.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(
        name = "know",
        indexes = {
                @Index(name = "know_word_index", columnList = "kwid")
        }
)
public class KnowWordEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long kwid;

    @Column(name = "latestReciteTime")
    private Timestamp latestReciteTime;

    @Column(name = "knowledge_level")
    private int knowledge_level;

    @Column(name = "kwName", length = 100)
    private String kwName;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "word_id")
    private WordEntity word;

    public KnowWordEntity(Timestamp latestReciteTime, int knowledge_level, String kwName, UserEntity user, WordEntity word) {
        this.latestReciteTime = latestReciteTime;
        this.knowledge_level = knowledge_level;
        this.kwName = kwName;
        this.user = user;
        this.word = word;
    }

    public KnowWordEntity(){}
    public Long getKwid() {
        return kwid;
    }

    public void setKwid(Long kwid) {
        this.kwid = kwid;
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

    public String getKwName() {
        return kwName;
    }

    public void setKwName(String kwName) {
        this.kwName = kwName;
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