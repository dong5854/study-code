package item2.hierarchicalbuilder;

/**
 * 칼조네 피자 - 계층적 빌더를 활용한 하위 클래스
 */
public class CalzonePizza extends Pizza {
    private final boolean sauceInside;

    public static class Builder extends Pizza.Builder<Builder> {
        private boolean sauceInside = false; // 기본값

        public Builder sauceInside() {
            sauceInside = true;
            return this;
        }

        @Override
        public CalzonePizza build() {
            return new CalzonePizza(this);
        }

        @Override
        protected Builder self() { return this; }
    }

    private CalzonePizza(Builder builder) {
        super(builder);
        sauceInside = builder.sauceInside;
    }

    @Override
    public String toString() {
        return String.format("%s로 토핑한 칼초네 피자 (소스는 %s에)",
                toppings, sauceInside ? "안" : "바깥");
    }
}
