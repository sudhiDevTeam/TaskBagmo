package com.IntTask.onelove.Servie;

import com.IntTask.onelove.Model.Cricketer;
import com.IntTask.onelove.Repository.CricketRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CricketService {
    @Autowired
    CricketRepo repo;

    public Cricketer SaveCricketer(Cricketer cricketer)
    {
       return repo.save(cricketer);
    }
    public List<Cricketer> getCricketer(){
        return repo.findAll();
    }

    public Cricketer findCrickerterById(Long id) {
        return repo.findById(id).orElse(new Cricketer());
    }

    public List<Cricketer> findCricketerByName(String name) {
        return (List<Cricketer>) repo.findByName(name).orElse(new Cricketer());
    }
    public List<Cricketer> findCricketerByLetter(String name) {
//        return  repo.findAllByNameIgnoreCaseStartingWith(name).orElseThrow(()-> new NoSuchElementException());
       return repo.findBynameStartingWith(name);
    }

    public ResponseEntity<String> deleteById(Long id) {
        Optional<Cricketer> byId = repo.findById(id);
        if(byId.isEmpty())
        {
            return new ResponseEntity<String>("Oopss", HttpStatus.BAD_REQUEST);
        }else{
            repo.deleteById(id);
            return new ResponseEntity<String>("cricketer removed", HttpStatus.OK);
        }

    }
    public Page<Cricketer> getByPage(int pageno, int pagesize)
    {
        Pageable page = PageRequest.of(pageno,pagesize);
        Page<Cricketer> pagas = repo.findAll(page);
        return  pagas;
    }


}
