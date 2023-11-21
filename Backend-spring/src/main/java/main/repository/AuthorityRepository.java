package main.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import main.domain.Authority;

import java.util.UUID;

@Repository
public interface AuthorityRepository extends JpaRepository<Authority, UUID>{

	Authority findByAuthority(String authority);
}
