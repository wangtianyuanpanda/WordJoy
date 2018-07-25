package bs.repositories;

import bs.entity.WordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordRepository extends JpaRepository<WordEntity, Long> {
    boolean existsByEnglish(String english);
    WordEntity findByEnglish(String english);
    List<WordEntity> findByType(String type);
    Optional<WordEntity> findById(long id);
    void deleteByEnglish(String english);
}
