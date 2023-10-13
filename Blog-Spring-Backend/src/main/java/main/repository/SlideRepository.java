package main.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import main.entity.Slide;

@Repository
public interface SlideRepository extends JpaRepository<Slide, Integer>{

	@Query(value="SELECT MAX(s.orded) FROM Slide s", nativeQuery = true)
	Integer findMaxOrder();

	@Query(value = "SELECT s FROM Slide s WHERE s.enabled = 1" , nativeQuery = true)
	List<Slide> findNotDisabledSlides();

	@Query("SELECT s FROM Slide s WHERE (:filterBy IS NULL OR "
			+ "  (:filterBy = 'orderNumber' AND  s.orderNumber > 0) OR   "
			+ "  (:filterBy = 'enabled'  AND s.enabled = true)  OR "
			+ "  (:filterBy = 'disabled' AND  s.enabled = false)) ")
	Page<Slide> findAllSlides(@Param("filterBy") String filterBy, PageRequest pageable);

	@Query("SELECT s FROM Slide s WHERE s.enabled = true ORDER BY s.orderNumber DESC")
	List<Slide> findAllEnabled();

}
