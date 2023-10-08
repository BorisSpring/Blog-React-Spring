package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.entity.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Integer>{

}
