package item3.field;

/**
 * public static final 필드 방식
 */
public class Dobby {
    public static final Dobby INSTANCE = new Dobby(); // 필드가 final

    private Dobby() { } // 생성자는 private 으로 감춘다.

    public void becomeFree() {
        System.out.println("주인님이 저에게 양말을 주셨어요!도비는 이제 자유의 몸이에요!");
    }
}
