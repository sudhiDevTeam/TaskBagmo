package com.IntTask.onelove.Repository;

import com.IntTask.onelove.Model.Cricketer;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CricketRepo extends JpaRepository<Cricketer,Long>, PagingAndSortingRepository<Cricketer,Long> {

    Optional<Cricketer> findByName(String name);


    List<Cricketer> findBynameStartingWith(String name);
}
