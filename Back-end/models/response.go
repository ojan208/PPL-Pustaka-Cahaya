package models

type ApiSuccesResponse struct {
	Status  string `json:"status"`
	Message string `json:"message,omitempty"`
	Data    any    `json:"data,omitempty"`
}

type ApiErrorResponse struct {
	Status       string `json:"status"`
	Message      string `json:"message,omitempty"`
	ErrorDetails any    `json:"error_details,omitempty"`
}

type RegisterResponse struct {
	UserId 		int 	`json:"userID"`  
	Email		string 	`json:"email"`
	Role 		int		`json:"role"`
}

func NewSuccessResponseNoData(message string) *ApiSuccesResponse {
	return &ApiSuccesResponse{
		Status:  "success",
		Message: message,
	}
}

func NewSuccessResponse(message string, data any) *ApiSuccesResponse {
	return &ApiSuccesResponse{
		Status:  "success",
		Message: message,
		Data:    data,
	}
}

func NewErrorResponse(status string, message string, error any) *ApiErrorResponse {
	return &ApiErrorResponse{
		Status:       status,
		Message:      message,
		ErrorDetails: error,
	}
}