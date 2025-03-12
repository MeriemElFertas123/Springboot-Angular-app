package com.ProjetPfa.ProjetPfa.Services;

import com.ProjetPfa.ProjetPfa.Dto.StudentDto;
import com.ProjetPfa.ProjetPfa.Entities.StudentEntity;
import com.ProjetPfa.ProjetPfa.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentImpl implements StudentService{
    @Autowired
    public StudentRepository studentRepository;
    @Override
    @Transactional
    public StudentDto createStudent(StudentDto payload){
        StudentEntity student = convertToEntity(payload);
        StudentEntity savedEntity = studentRepository.save(student);
        return convertToDto(savedEntity);
    }
    @Override
    public StudentDto getStudentById(Long id) {
        StudentEntity studentEntity = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec l'ID : " + id));
        return convertToDto(studentEntity);
    }

    @Override
    public StudentDto updateStudent(StudentDto payload,Long id){
      StudentEntity studentEntity = studentRepository.findById(id).orElseThrow(()-> new RuntimeException("Data with the id : " + id + "is not found"));
      studentEntity.setPhone(payload.getPhone());
      studentEntity.setGender(payload.getGender());
      studentEntity.setEmail(payload.getEmail());
      studentEntity.setUsername(payload.getUsername());
      studentEntity.setImageUrl(payload.getImageUrl());
      StudentEntity student = studentRepository.save(studentEntity);
      return convertToDto(student);
    }
    @Override
    public String deleteStudent(Long id){
        StudentEntity student = studentRepository.findById(id).orElseThrow( () -> new RuntimeException(" the data with the id : " + id + "not found"));
        studentRepository.delete(student);
        return "the data with the id " + id + "deleted successfully";
    }
    @Override
    public List<StudentDto> getAllStudents(){
        List<StudentEntity> students = studentRepository.findAll();

        return  students.stream().map(this::convertToDto).collect(Collectors.toList());
    }
    public StudentEntity convertToEntity(StudentDto payload){
        StudentEntity entity = new StudentEntity();
        entity.setId(payload.getId());
        entity.setPhone(payload.getPhone());
        entity.setEmail(payload.getEmail());
        entity.setGender(payload.getGender());
        entity.setUsername(payload.getUsername());
        entity.setImageUrl(payload.getImageUrl());
        return entity;
    }
    StudentDto convertToDto(StudentEntity entity){
        StudentDto studentDto = new StudentDto();
        studentDto.setId(entity.getId());
        studentDto.setPhone(entity.getPhone());
        studentDto.setEmail(entity.getEmail());
        studentDto.setGender(entity.getGender());
        studentDto.setUsername(entity.getUsername());
        studentDto.setImageUrl(entity.getImageUrl());
        return studentDto;
    }

}
