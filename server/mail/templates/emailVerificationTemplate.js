const emailTemplate = (otp) => {
  return `<!DOCTYPE html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email - B.S.H RESIDENCY</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
				border: 1px solid #e0e0e0;
				border-radius: 10px;
				background-color: #f9f9f9;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 24px;
				font-weight: bold;
				margin-bottom: 20px;
				color: #333;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
				text-align: left;
				background: white;
				padding: 20px;
				border-radius: 8px;
			}
	
			.otp-container {
				background: #f8f9fa;
				padding: 15px;
				text-align: center;
				font-size: 32px;
				font-weight: bold;
				letter-spacing: 8px;
				margin: 20px 0;
				border-radius: 8px;
				color: #333;
				border: 2px dashed #FFD60A;
			}
	
			.support {
				font-size: 14px;
				color: #666;
				margin-top: 20px;
				padding-top: 20px;
				border-top: 1px solid #e0e0e0;
			}
			
			.highlight {
				font-weight: bold;
				color: #FFD60A;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="message">B.S.H RESIDENCY - Email Verification</div>
			<div class="body">
				<p>Dear Guest,</p>
				<p>Thank you for choosing <span class="highlight">B.S.H RESIDENCY</span>. Use the following OTP to complete your registration:</p>
				
				<div class="otp-container">${otp}</div>
				
				<p>This OTP is valid for <strong>5 minutes</strong>. If you did not request this verification, please disregard this email.</p>
				<p>Once your account is verified, you will have access to our platform and its features.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at 
				<a href="mailto:info@bshresidency.com">info@bshresidency.com</a>. We are here to help!
			</div>
		</div>
	</body>
	</html>`;
};

module.exports = emailTemplate;