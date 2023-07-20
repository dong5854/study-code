package streamstudy;

import java.util.*;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        List<OnlineClass> springClasses = new ArrayList<>();
        springClasses.add(new OnlineClass(1, "spring boot", true));
        springClasses.add(new OnlineClass(2, "spring Data JPA", true));
        springClasses.add(new OnlineClass(3, "spring mvc", false));
        springClasses.add(new OnlineClass(4, "spring core", false));
        springClasses.add(new OnlineClass(5, "rest api development", false));

        System.out.println("spring 으로 시작하는 수업");
        springClasses.stream()
                .filter(oc -> oc.getName().startsWith("spring"))
                .forEach(System.out::println);

        System.out.println("close 되지 않은 수업");
//        springClasses.stream()
//                        .filter(oc -> !oc.isClosed())
//                        .forEach(System.out::println);
//        메서드 레퍼런스를 사용할 수 있다
        springClasses.stream()
                        .filter(Predicate.not(OnlineClass::isClosed))
                        .forEach(System.out::println);

        System.out.println("수업 이름만 모아서 스트림 만들기");
        springClasses.stream()
                .map(OnlineClass::getName)
                .forEach(System.out::println);

        List<OnlineClass> javaClasses = new ArrayList<>();
        javaClasses.add(new OnlineClass(6,"The Java, Test", true));
        javaClasses.add(new OnlineClass(7,"The Java, Code manipulation", true));
        javaClasses.add(new OnlineClass(8,"The Java, 8 to 11", false));

        List<List<OnlineClass>> studyEvents = new ArrayList<>();
        studyEvents.add(springClasses);
        studyEvents.add(javaClasses);

        System.out.println("두 수업 목록에 들어있는 모든 수업 아이디 출력");
        studyEvents.stream()
                .flatMap(Collection::stream)
                .forEach(oc -> System.out.println(oc.getId()));

        System.out.println("10부터 1 증가하는 무제한 스트림 중에서 앞 10개 빼 최대 10개 까지만");
        Stream.iterate(10, i -> i + 1)
                .skip(10)
                .limit(10)
                .forEach(System.out::println);

        System.out.println("자바 수업 중 Test가 들어있는 수업이 있는지 확인");
        boolean test = javaClasses.stream()
                .anyMatch(oc -> oc.getName().contains("Test"));
        System.out.println(test);

        System.out.println("스프링 수업 중 제목이 spring이 들어간 것 모아서 List로 만들기");
        List<String> spring = springClasses.stream()
                .filter(oc -> oc.getName().contains("spring"))
                .map(OnlineClass::getName)
                .collect(Collectors.toList());

        spring.forEach(System.out::println);
    }
}
