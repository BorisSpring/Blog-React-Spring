package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.entity.Authority;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, Integer>{

	Authority findByauthority(String authority);
}
