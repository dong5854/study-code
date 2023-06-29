package item1;

import java.util.*;
import java.math.*;

public class Main {
    public static void main(String[] args) {
        BigInteger bi = BigInteger.probablePrime(3, new Random());
        System.out.println(bi);
        bi = new BigInteger(3,5,new Random());
        System.out.println(bi);
        Boolean.valueOf(true);
    }
}
