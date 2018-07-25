package bs.responses.session;

import org.jetbrains.annotations.Nls;

/**
 * @author wty
 */
public class LoginResponse {
    private final String name;
    private final String token;
    private final @Nls
    String info;

    public LoginResponse(String name, String token,  String info) {
        this.name = name;
        this.token = token;
        this.info = info;
    }

    public String getName() {
        return name;
    }

    public String getToken() {
        return token;
    }

    public String getInfo() {
        return info;
    }
}
