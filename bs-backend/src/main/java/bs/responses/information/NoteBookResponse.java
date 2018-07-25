package bs.responses.information;

import bs.entity.WordEntity;

import java.util.List;

public class NoteBookResponse {
    private String status;
    private final List<WordEntity> noteBookWords;
//
//    public class NoteBookInfo{
//        private Long id;
//        private String english;
//        private String chinese;
//        private String pronunciation;
//        private String example;
//        private String type;
//    }

    public NoteBookResponse(String status, List<WordEntity> noteBookWords) {
        this.status = status;
        this.noteBookWords = noteBookWords;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<WordEntity> getNoteBookWords() {
        return noteBookWords;
    }
}
