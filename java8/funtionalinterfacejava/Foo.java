package funtionalinterfacejava;

public class Foo {

    public static void main(String[] args) {

        // 익명 클래스
        RunSomething runSomethingAnonymous = new RunSomething() {
            @Override
            public void doIt() {
                System.out.println("runSomethingAnonymous do it");
            }
        };

        runSomethingAnonymous.doIt();

        //람다
        RunSomething runSomethingLambda = () -> System.out.println("runSomethingLambda do it");
        runSomethingLambda.doIt();
    }
}
