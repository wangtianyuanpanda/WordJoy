package bs.repositories;

import bs.entity.KnowWordEntity;
import bs.entity.UserEntity;
import bs.entity.WordEntity;
import org.springframework.data.repository.CrudRepository;

import java.sql.Timestamp;
import java.util.List;

public interface KnowWordRepository extends CrudRepository<KnowWordEntity, Long> {
    boolean existsByKwid(long id);
    KnowWordEntity findByKwid(long id);
    void deleteByWordAndUser(WordEntity word, UserEntity user);
    List<KnowWordEntity> findByLatestReciteTimeBetweenAndWord_TypeAndUser(Timestamp start, Timestamp end, String type, UserEntity user);
}
