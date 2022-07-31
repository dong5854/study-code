package com.spring.basics.demo.basic;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.config.ConfigurableBeanFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope(ConfigurableBeanFactory.SCOPE_SINGLETON)
public class BinarySearchImpl {

    @Autowired
    @Qualifier("quick")
    private SortAlgorithm sortAlgorithm;

//    public BinarySearchImpl(SortAlgorithm sortAlgorithm) {
//        this.sortAlgorithm = sortAlgorithm;
//    }

//    public void setSortAlgorithm(SortAlgorithm sortAlgorithm) {
//        this.sortAlgorithm = sortAlgorithm;
//    }

    public int binarySearch(int[] numbers, int numberToSearchFor){

        int[] sortedNumbers = sortAlgorithm.sort(numbers);
        System.out.println(sortAlgorithm);
        //Implementing Sorting Logic

        //Bubble Sort Algorithm

        //Search the array
        return 3;
    }
}
