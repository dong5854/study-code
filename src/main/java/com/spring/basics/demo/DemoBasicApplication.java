package com.spring.basics.demo;

import com.spring.basics.demo.basic.BinarySearchImpl;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoBasicApplication {

	public static void main(String[] args) {

//		BinarySearchImpl binarySearch = new BinarySearchImpl(new QuickSortAlgorithm());

		ApplicationContext ac = SpringApplication.run(DemoBasicApplication.class, args);

		BinarySearchImpl binarySearch = ac.getBean(BinarySearchImpl.class);

		BinarySearchImpl binarySearch1 = ac.getBean(BinarySearchImpl.class);

		System.out.println(binarySearch);
		System.out.println(binarySearch1);

		int result = binarySearch.binarySearch(new int[] {12, 3, 6}, 3);
		System.out.println(result);
	}

}
