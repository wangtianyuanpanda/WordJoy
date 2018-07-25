package bs.utils;

import org.jetbrains.annotations.NonNls;
import org.jetbrains.annotations.NotNull;

import java.sql.Timestamp;
import java.util.TimeZone;

public class TimeUtils {
    public static @NotNull
    @NonNls
    Timestamp getBeginOfDay(){
        long current=System.currentTimeMillis();//当前时间毫秒数
        long zero=current/(1000*3600*24)*(1000*3600*24)-TimeZone.getDefault().getRawOffset();//今天零点零分零秒的毫秒数
        return new Timestamp(zero);
    }

    public static @NotNull
    @NonNls
    Timestamp getEndOfDay(){
        long current=System.currentTimeMillis();//当前时间毫秒数
        long zero=current/(1000*3600*24)*(1000*3600*24)-TimeZone.getDefault().getRawOffset();//今天零点零分零秒的毫秒数
        long twelve=zero+24*60*60*1000-1;//今天23点59分59秒的毫秒数
        return new Timestamp(twelve);
    }
}
