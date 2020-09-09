package com.IntTask.onelove.Controller;

import com.IntTask.onelove.Model.Cricketer;
import com.IntTask.onelove.Servie.CricketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class CricketerController {
//    Create a new crud for the country.
//Remove country from cricketers entity and use country id when creating new cricketers
//Fetch cricketers by country id -- done
//Search cricketers with name -- done
//Pagination ( 10 per page )
    @Autowired
    CricketService service;
    @GetMapping("/sudhi")
    @ResponseBody
    public String Home()
    {
        return "hai its workiing fine";
    }

    @PostMapping(value = "/add-cricketer",consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Cricketer addCricketer(@RequestBody Cricketer cricketer)
    {
        return service.SaveCricketer(cricketer);
    }

    @GetMapping("/getAll-cricketer")
    @ResponseBody
    public List<Cricketer> getAllCricketer()
    {
        return service.getCricketer();
    }
    @GetMapping("/get-cricketer/{id}")
    @ResponseBody
    public Cricketer getCricketerById(@PathVariable("id") Long id)
    {
        return service.findCrickerterById(id);
    }

    @GetMapping("/get-cricketer-search/{name}")
    @ResponseBody
    public List<Cricketer> getCricketerByname(@PathVariable("name") String name)
    {
        return service.findCricketerByName(name);
    }

    @GetMapping("/get-cricketer-searchByletter/{name}")
    @ResponseBody
    public List<Cricketer> getCricketerByLetter(@PathVariable("name") String name)
    {
        return service.findCricketerByLetter(name);
    }
    @DeleteMapping("/removeData/{id}")
    @ResponseBody
    public ResponseEntity<String> removeData(@PathVariable("id") Long id){
        return service.deleteById(id);
    }

    @GetMapping("/pagable/{pageno}/{pagesize}")
    @ResponseBody
    public Page<Cricketer> getByPage(@PathVariable("pageno") int pageno,@PathVariable("pagesize") int pagesize)
    {
        return service.getByPage(pageno,pagesize);
    }
    @PutMapping("/update-cricketer/{id}")
    @ResponseBody
    public Cricketer updateCricketer(@PathVariable("id") Long id, @RequestBody Cricketer cricketer)
    {
        Cricketer crick = service.findCrickerterById(id);
        crick.setName(cricketer.getName());
        crick.setCountry(cricketer.getCountry());
        crick.setHighestScore(cricketer.getHighestScore());
        return service.SaveCricketer(crick);
    }
}
