package funtionalinterfacejava;

import java.util.ArrayList;
import java.util.List;
import java.util.Spliterator;

public class SpliteratorEx {
    public static void main(String[] args) {
        List<String> names = new ArrayList<>();
        names.add("이동영");
        names.add("이동십");
        names.add("이동백");
        names.add("이동천");

        Spliterator<String> spliterator = names.spliterator();
        Spliterator<String> spliterator2 = spliterator.trySplit();

        while (spliterator.tryAdvance(System.out::println));
        System.out.println("==============================");
        while (spliterator2.tryAdvance(System.out::println));
    }
}
