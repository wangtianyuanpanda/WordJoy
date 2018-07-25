package bs.responses.information;

import bs.entity.WordEntity;

import java.util.List;
import java.util.ArrayList;

public class GetWordResponse {
    private final List<WordInfo> words;

    class WordInfo {
        private Long id;
        private String english;
        private String chinese;
        private String example;
        private String type;


        WordInfo(Long id, String english, String chinese, String example, String type) {
            this.id = id;
            this.english = english;
            this.chinese = chinese;
            this.example = example;
            this.type = type;
        }

        WordInfo(WordEntity word) {
            this.id = word.getId();
            this.english = word.getEnglish();
            this.chinese = word.getChinese();
            this.example = word.getExample();
            this.type = word.getType();
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public String getEnglish() {
            return english;
        }

        public void setEnglish(String english) {
            this.english = english;
        }

        public String getChinese() {
            return chinese;
        }

        public void setChinese(String chinese) {
            this.chinese = chinese;
        }

        public String getExample() {
            return example;
        }

        public void setExample(String example) {
            this.example = example;
        }

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }
    }


    public GetWordResponse(List<WordEntity> words){
        this.words = new ArrayList<>();
        for(WordEntity clazz : words){
            this.words.add(new WordInfo(clazz));
        }
    }

    public List<WordInfo> getWords() {
        return words;
    }
}
