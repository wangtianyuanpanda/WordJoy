package bs.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(
        name = "word",
        indexes = {
                @Index(name = "word_index", columnList = "english")
        }
)
public class WordEntity {
    private String english;
    private String chinese;
    private String example;
    private String type;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "english", nullable = false, length = 30)
    public String getEnglish() {return english;}
    public void setEnglish(String english) {this.english = english;}

    @Column(name = "chinese", nullable = false, length = 30)
    public String getChinese() {return chinese;}
    public void setChinese(String chinese) {this.chinese = chinese;}

    @Column(name = "example", nullable = false, length = 100)
    public String getExample() {return this.example;}
    public void setExample(String example) {this.example = example;}

    @Column(name = "type", nullable = false, length = 15)
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public WordEntity(String english, String chinese, String example, String type) {
        this.english = english;
        this.chinese = chinese;
        this.example = example;
        this.type = type;
    }

    public WordEntity(){}
    @Override
    public int hashCode() {

        return Objects.hash(id, english, chinese, example, type);
    }

    @Override
    public boolean equals(Object obj) {
        if(!obj.getClass().equals(this.getClass())){
            return  false;
        } else if (id != null){
            return  (id.equals(((WordEntity) obj).id));
        } else {
            return super.equals(obj);
        }
    }
}
