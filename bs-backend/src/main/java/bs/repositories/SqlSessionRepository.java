package bs.repositories;

import org.springframework.data.repository.CrudRepository;
import bs.entity.SessionEntity;

import java.util.Optional;

/**
 * @author wty
 */
public interface SqlSessionRepository extends CrudRepository<SessionEntity, Long> {
    boolean existsByName(String name);
    boolean existsByToken(String token);
    Optional<SessionEntity> findByName(String name);
    SessionEntity findByToken(String token);

}
