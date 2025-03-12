package com.ProjetPfa.ProjetPfa.Services;

import com.ProjetPfa.ProjetPfa.Dto.StudentDto;

import java.util.List;

public interface StudentService {
    public StudentDto createStudent(StudentDto payload);
    public StudentDto updateStudent(StudentDto payload,Long id);
    public String deleteStudent(Long id);
    public List<StudentDto> getAllStudents();
    StudentDto getStudentById(Long id);

}
