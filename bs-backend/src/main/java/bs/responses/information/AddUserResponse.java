package bs.responses.information;

import org.jetbrains.annotations.Nls;

/**
 * @author wty
 */
public class AddUserResponse {
    private final @Nls
    String status;
    private final String name;

    public AddUserResponse(String status, String name) {
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
