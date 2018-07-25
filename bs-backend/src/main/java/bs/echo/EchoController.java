package bs.echo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author wty
 */
@RestController
public class EchoController {
    @GetMapping("/echo")
    public String echo() {
        return "Reciting Words Website is running.";
    }
}

