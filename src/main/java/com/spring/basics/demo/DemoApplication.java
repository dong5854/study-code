package com.spring.basics.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		BinarySearchImpl binarySearch = new BinarySearchImpl(new QuickSortAlgorithm());

		int result = binarySearch.binarySearch(new int[] {}, 3);

		System.out.println(result);

		SpringApplication.run(DemoApplication.class, args);
	}

}
