package com.spring.basics.demo.basic;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("quick")
public class QuickSortAlgorithm implements SortAlgorithm{
    public int[] sort(int[] numbers) {
        //Logic fort Quick Sort
        return numbers;
    }
}
