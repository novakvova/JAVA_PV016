package shop.controllers;

import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.dto.CategoryDTO;
import shop.dto.UploadImageDto;
import shop.repositories.CategoryRepository;
import shop.storage.StorageProperties;
import shop.storage.StorageService;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@AllArgsConstructor
public class HomeController {
    private final StorageService storageService;
    private static List<CategoryDTO> list= new ArrayList<>();
    @GetMapping("/")
    public List<CategoryDTO> index() {
        return list;
    }

    @PostMapping("/")
    public void add(@RequestBody CategoryDTO category) {
        list.add(category);
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto dto) {
        String fileName = storageService.save(dto.getBase64());
        return fileName;
    }

    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serverfile(@PathVariable String filename) throws Exception {
        Resource file = storageService.loadAsResource(filename);
        String urlFileName = URLEncoder.encode("Сало.jpg", StandardCharsets.UTF_8.toString());
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION, "filename=\""+urlFileName+"\"")
                .body(file);
    }
}
