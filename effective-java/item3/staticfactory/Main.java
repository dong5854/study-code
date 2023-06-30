package item3.staticfactory;

public class Main {
    public static void main(String[] args) {
        Dobby dobby = Dobby.getInstance();
        dobby.becomeFree();
    }
}
