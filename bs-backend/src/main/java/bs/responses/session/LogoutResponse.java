package bs.responses.session;

import org.jetbrains.annotations.Nls;

public class LogoutResponse {
    @Nls
    final private String status;
    final private String name;

    public LogoutResponse(String status, String name) {
        this.status = status;
        this.name = name;
    }

    public String getStatus() {
        return status;
    }

    public String getName() {
        return name;
    }
}
