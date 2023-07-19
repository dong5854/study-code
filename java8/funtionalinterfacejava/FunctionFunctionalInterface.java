package funtionalinterfacejava;

import java.util.function.Function;
public class FunctionFunctionalInterface {

    public static void main(String[] args) {
        // Function<T, R>
        Function<Integer, Integer> plus10 = (num) -> num + 10;
        System.out.println(plus10.apply(1));

        Function<Integer, Integer> multiply2 = (num) -> num * 2;
        System.out.println(multiply2.apply(1));

        Function<Integer, Integer> multiply2AndPlus10 = plus10.compose(multiply2);
        System.out.println(multiply2AndPlus10.apply(2));

        Function<Integer, Integer> plus10AndMultiply2 = plus10.andThen(multiply2);
        System.out.println(plus10AndMultiply2.apply(3));
    }
}
