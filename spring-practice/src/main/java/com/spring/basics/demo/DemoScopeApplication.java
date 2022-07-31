package com.spring.basics.demo;

import com.spring.basics.demo.scope.PersonDAO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class DemoScopeApplication {

	private static Logger LOGGER = LoggerFactory.getLogger(DemoScopeApplication.class);
	public static void main(String[] args) {
		ApplicationContext ac = SpringApplication.run(DemoScopeApplication.class, args);

		PersonDAO personDao = ac.getBean(PersonDAO.class);
		PersonDAO personDao2 = ac.getBean(PersonDAO.class);

		LOGGER.info("{}", personDao);
		LOGGER.info("{}", personDao.getJdbcConnection());

		LOGGER.info("{}", personDao2);
		LOGGER.info("{}", personDao2.getJdbcConnection());
	}
}