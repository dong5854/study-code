package streamstudy;

public class OnlineClass {
    private int id;
    private String name;
    private boolean closed;

    public OnlineClass(int id, String name, boolean closed) {
        this.id = id;
        this.name = name;
        this.closed = closed;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    @Override
    public String toString() {
        return "OnlineClass{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", closed=" + closed +
                '}';
    }
}
