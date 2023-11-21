package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import main.domain.Tag;
import java.util.UUID;

@Repository
public interface TagRepository extends JpaRepository<Tag, UUID>{

    Boolean existsByName(String name);

}
