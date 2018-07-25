package bs.repositories;

import org.springframework.data.repository.CrudRepository;
import bs.entity.UserEntity;

import java.util.List;

/**
 * @author wty
 */
public interface UserRepository extends CrudRepository<UserEntity, Long> {
    /**
     * @param name
     * @return boolean
     * check exists of a Name
     */
    boolean existsByName(String name);

    UserEntity findByName(String name);

    UserEntity findById(long id);

}
