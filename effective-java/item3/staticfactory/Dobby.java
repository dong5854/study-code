package item3.staticfactory;

/**
 * 정적 팩토리 메서드를 public static 멤버로 제공하는 방식
 */
public class Dobby {
    private static final Dobby INSTANCE = new Dobby();
    private Dobby() { } // 생성자는 private 으로 감춘다.
    public static Dobby getInstance() { return INSTANCE; }

    public void becomeFree() {
        System.out.println("주인님이 저에게 양말을 주셨어요!도비는 이제 자유의 몸이에요!");
    }
}
