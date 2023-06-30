package item3.enumtype;

/**
 * 열거 타입을 선언하는 방식
 */
public enum Dobby {
    INSTANCE;

    public void becomeFree() {
        System.out.println("주인님이 저에게 양말을 주셨어요!도비는 이제 자유의 몸이에요!");
    }
}
