package item2.hierarchicalbuilder;

import static item2.hierarchicalbuilder.NyPizza.Size.*;
import static item2.hierarchicalbuilder.Pizza.Topping.*;

public class Main {
    public static void main(String[] args) {
        NyPizza pizza = new NyPizza.Builder(SMALL)
                .addTopping(SAUSAGE).addTopping(ONION).build();
        CalzonePizza calzone = new CalzonePizza.Builder()
                .addTopping(HAM).sauceInside().build();

        System.out.println(pizza);
        System.out.println(calzone);
    }
}
