package bs.repositories;

import bs.entity.UnknowWordEntity;
import bs.entity.UserEntity;
import bs.entity.WordEntity;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface UnKnowWordRepository  extends CrudRepository<UnknowWordEntity, Long> {
    boolean existsByUkwid(long id);
    boolean existsByUkwName(String ukwname);
    boolean existsByWordAndUser(WordEntity word, UserEntity user);
    UnknowWordEntity findByUkwid(long id);
    UnknowWordEntity findByUkwName(String ukwname);
    List<UnknowWordEntity> findByUser(UserEntity user);
    List<UnknowWordEntity> findByUserAndLatestReciteTimeNotNull(UserEntity userEntity);
    void deleteByWordAndUser(WordEntity word, UserEntity user);
    void deleteByWord_English(String english);
    List<UnknowWordEntity> findByWord_TypeAndUser(String type, UserEntity user);
    List<UnknowWordEntity> findByLatestReciteTimeNotNull();
    List<UnknowWordEntity> findByLatestReciteTimeBetweenAndUserAndWord_Type(Timestamp start, Timestamp end, UserEntity user, String type);
}
